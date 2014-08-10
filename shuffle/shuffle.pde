Card[] cards = new Card[60];

void setup()
{
  size(1300, 800);
  Deck deck = new Deck(60);

  pushMatrix();

  translate(0, 20);
  deck.draw();
  
//  int[] seq = { 7, 11, 13, 17, 7, 7, 7 };
//  deck.pileSeq(seq);

  deck.shuffle();
  deck.shuffle();
  deck.shuffle();
  deck.shuffle();
  deck.shuffle();
  deck.shuffle();
  deck.shuffle();
  deck.shuffle();

  popMatrix();
}

void draw()
{
}

class Card
{
  int val;

  Card(int n)
  {
    val = n;
  }

  void draw()
  {
    fill(255-2*val);
    rect(0, 0, 18, 24);
    fill(0);
    text(val, 3, 13);
  }
}


class Deck
{
  Card[] cards;

  Deck(int n)
  {
    cards = new Card[n];
    for (int i = 0; i < n; i++)
    {
      cards[i] = new Card(i+1);
    }
  }

  void draw()
  {
    pushMatrix();
    for (Card c : cards)
    {
      translate(20, 0);
      c.draw();
    }
    popMatrix();
  }

  void reverse()
  {
    Card save;
    for (int i = 0; i < cards.length / 2; i++)
    {
      save = cards[i];
      cards[i] = cards[cards.length - 1 - i];
      cards[cards.length - 1 - i] = save;
    }
  }
  
  void combine(Deck d)
  {
    Card[] result = new Card[cards.length + d.cards.length];
    for (int i = 0; i < cards.length; i++)
    {
      result[i] = cards[i];
    }
    for (int i = 0; i < d.cards.length; i++)
    {
      result[cards.length + i] = d.cards[i];
    }
    cards = result;
  }
  
  void cut()
  {
    int n = int(random(1, cards.length - 1));
    Card[] result = new Card[cards.length];
    for (int i = n; i < cards.length; i++)
    {
      result[i - n] = cards[i];
    }
    for (int i = 0; i < n; i++)
    {
      result[cards.length - n + i] = cards[i];
    }
    cards = result;
  }
  
  void pileize(int n)
  {
    Deck[] piles = new Deck[n];
    for (int i = 0; i < n; i++)
    {
      int len = cards.length / n;
      if (cards.length % n > i) { len++; }
      piles[i] = new Deck(len);
    }
    for (int i = 0; i < cards.length; i++)
    {
      int c = i % n;
      int r = i / n;
      piles[c].cards[r] = cards[i];
    }
    Deck result = new Deck(0);
    for (Deck d : piles)
    {
      d.reverse();
      result.combine(d);
    }
    cards = result.cards;
  }
  
  void pileSeq(int[] steps)
  {
    for (int n : steps)
    {
      pileize(n);
      translate(0, 60);
      draw();
    }
  }
  
  void shuffle()
  {
    for (int i = 0; i < cards.length; i++)
    {
      Card save = cards[i];
      int j = int(random(i, cards.length)); 
      cards[i] = cards[j];
      cards[j] = save;
    }
    translate(0, 60);
    draw();
  }
}
