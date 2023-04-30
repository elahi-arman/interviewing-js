interface TrieNode {
  letter: string;
  children: Record<string, TrieNode>;
  leaf: boolean;
}

const Trie = () => {
  const root: TrieNode = { letter: "", children: {}, leaf: false };

  const addWord = (word: string): void => {
    let current = root;
    for (const letter of word) {
      if (!current.children[letter]) {
        current.children[letter] = { letter, children: {}, leaf: false };
      }
      current = current.children[letter];
    }

    current.leaf = true;
  };

  const printDictionary = (node: TrieNode, current: string): void => {
    const word = current + node.letter;
    if (node.leaf) {
      console.log(word);
    }

    for (const letter of Object.values(node.children)) {
      printDictionary(letter, word);
    }
  };

  const searchWord = (word: string): boolean => {
    let current = root;
    for (const letter of word) {
      if (!current.children[letter]) {
        return false;
      }
      current = current.children[letter];
    }

    return current.leaf;
  };

  return {
    addWord,
    searchWord,
    printDictionary: () => printDictionary(root, ""),
  };
};

const t = Trie();
t.addWord("cat");
t.addWord("catch");
t.addWord("dog");
t.addWord("sand");
t.addWord("case");

t.printDictionary();
console.log("cat? ", t.searchWord("cat"));
