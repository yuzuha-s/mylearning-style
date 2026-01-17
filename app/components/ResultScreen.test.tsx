import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultScreen from './ResultScreen';

// Next.jsのLinkをモック
jest.mock('next/link', () => {
  const LinkComponent = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  LinkComponent.displayName = 'Link';
  return LinkComponent;
});

// canvas-confettiをモック
jest.mock('canvas-confetti', () => {
  return jest.fn(() => Promise.resolve());
});

describe('ResultScreen', () => {
  const mockResult = {
    title: '理論重視型',
    desc: 'テスト用の説明',
  };

  const mockOnRestart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('コンポーネントが正常にレンダリングされる', () => {
    render(<ResultScreen result={mockResult} onRestart={mockOnRestart} />);
    expect(screen.getByText('分析が完了しました')).toBeInTheDocument();
  });

  test('結果タイトルが表示される', () => {
    render(<ResultScreen result={mockResult} onRestart={mockOnRestart} />);
    expect(screen.getByText('理論重視型')).toBeInTheDocument();
  });

  test('対応するキーワードが表示される', () => {
    render(<ResultScreen result={mockResult} onRestart={mockOnRestart} />);
    expect(screen.getByText('理解力')).toBeInTheDocument();
  });

  test('対応する説明文が表示される', () => {
    render(<ResultScreen result={mockResult} onRestart={mockOnRestart} />);
    const expectedText = '「なぜ？」を解決することがやる気の源泉です。全体像を把握し、納得してから進むことで驚異的な理解力を発揮します。論理的なつながりが見えた時、あなたの学習スピードは最大化されます。';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test('「再度診断する」ボタンが表示される', () => {
    render(<ResultScreen result={mockResult} onRestart={mockOnRestart} />);
    expect(screen.getByText('再度診断する')).toBeInTheDocument();
  });

  test('「Home」ボタンが表示される', () => {
    render(<ResultScreen result={mockResult} onRestart={mockOnRestart} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('存在しない結果タイプはデフォルトテキストが表示される', () => {
    const unknownResult = {
      title: '存在しない型',
      desc: 'デフォルト説明',
    };
    render(<ResultScreen result={unknownResult} onRestart={mockOnRestart} />);
    expect(screen.getByText('分析中')).toBeInTheDocument();
  });

  test('ハイドレーション完了後にレンダリングされる', async () => {
    render(<ResultScreen result={mockResult} onRestart={mockOnRestart} />);
    
    // ハイドレーション完了後、要素が存在することを確認
    await waitFor(() => {
      expect(screen.getByText('理論重視型')).toBeInTheDocument();
    });
  });

  test('複数の結果タイプがマッピングされている', () => {
    const resultTypes = ['理論 × 実践', 'コツコツ型', '万能ハイブリット型'];
    
    resultTypes.forEach((type) => {
      const { unmount } = render(
        <ResultScreen result={{ title: type, desc: 'テスト' }} onRestart={mockOnRestart} />
      );
      expect(screen.getByText(type)).toBeInTheDocument();
      unmount();
    });
  });

  describe('ロジック検証', () => {
    test('結果タイプから正しいキーワードが抽出される', () => {
      render(<ResultScreen result={{ title: '実践重視型', desc: 'テスト' }} onRestart={mockOnRestart} />);
      // 「実践重視型」に対応するキーワードは「行動力」
      expect(screen.getByText('行動力')).toBeInTheDocument();
    });

    test('結果タイプから正しい説明文が抽出される', () => {
      render(<ResultScreen result={{ title: 'コツコツ型', desc: 'テスト' }} onRestart={mockOnRestart} />);
      const expectedText = '継続こそが最大の武器。派手な一歩よりも、昨日の自分を超える数ミリの積み重ねが自信に繋がります。最終的に誰よりも高い場所に到達できる、圧倒的な安定感の持ち主です。';
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test('複合タイプの説明が正しく表示される', () => {
      render(<ResultScreen result={{ title: '理論 × 実践', desc: 'テスト' }} onRestart={mockOnRestart} />);
      expect(screen.getByText('ハイブリッド')).toBeInTheDocument();
      const expectedText = '納得感と行動力をどちらも備えたバランス派！効率よく、かつ確実に成果を出すことができる最強の組み合わせです。';
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    test('存在しないタイプの場合、デフォルト値が使用される', () => {
      const unknownType = '存在しない学習スタイル';
      render(<ResultScreen result={{ title: unknownType, desc: 'カスタム説明' }} onRestart={mockOnRestart} />);
      // キーワードが「分析中」で、説明がカスタム説明
      expect(screen.getByText('分析中')).toBeInTheDocument();
      expect(screen.getByText('カスタム説明')).toBeInTheDocument();
    });

    test('すべての定義済みタイプが typeDetails に存在する', () => {
      const definedTypes = [
        '理論重視型',
        '実践重視型',
        'コツコツ型',
        '短期集中型',
        '理論 × 実践',
        '理論 × コツコツ',
        '実践 × 短期集中',
        'コツコツ × 短期集中',
        '万能ハイブリット型',
        'これから発見型',
      ];

      definedTypes.forEach((type) => {
        const { unmount } = render(
          <ResultScreen result={{ title: type, desc: 'テスト' }} onRestart={mockOnRestart} />
        );
        // タイプが表示されている = typeDetails に存在している
        expect(screen.getByText(type)).toBeInTheDocument();
        unmount();
      });
    });

    test('ハイドレーション状態が正しく管理される', async () => {
      const { rerender } = render(
        <ResultScreen result={mockResult} onRestart={mockOnRestart} />
      );
      
      // 初期レンダリング時も要素が表示されている
      expect(screen.getByText('理論重視型')).toBeInTheDocument();
      
      // 再レンダリング後も正常に表示される
      rerender(<ResultScreen result={mockResult} onRestart={mockOnRestart} />);
      expect(screen.getByText('理論重視型')).toBeInTheDocument();
    });

    test('各タイプのキーワードが正しくマッピングされている', () => {
      const typeKeywordMap: { [key: string]: string } = {
        '理論重視型': '理解力',
        '実践重視型': '行動力',
        'コツコツ型': '継続力',
        '短期集中型': '没頭力',
        '理論 × 実践': 'ハイブリッド',
        '理論 × コツコツ': '着実な戦略家',
        '実践 × 短期集中': '瞬発的行動派',
        'コツコツ × 短期集中': '変幻自在',
        '万能ハイブリット型': '全能',
        'これから発見型': '未知の可能性',
      };

      Object.entries(typeKeywordMap).forEach(([type, keyword]) => {
        const { unmount } = render(
          <ResultScreen result={{ title: type, desc: 'テスト' }} onRestart={mockOnRestart} />
        );
        expect(screen.getByText(keyword)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
