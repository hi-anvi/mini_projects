"""Withdraws a flock of cards"""

import random

def number():
    """Returns a random number or queen, king, jake, ace."""
    num = random.randint(1, 13)
    if num == 1:
        num = "Ace"
    elif num == 11:
        num = "Jake"
    elif num == 12:
        num = "Queen"
    elif num == 13:
        num = "King"
    return num

def color():
    """Returns a random color of the card"""
    num = random.randint(1, 4)
    if num == 1:
        num = "Diamonds"
    elif num == 2:
        num = "Hearts"
    elif num == 3:
        num = "Spades"
    else:
        num = "Clubs"
    return num

def cards(num_cards, cards_used, user_card):
    """Returns the cards"""
    for c in range(num_cards):
        num = number()
        symbol = color()
        card = str(num) + " of " + symbol
        if card in cards_used:
            continue
        user_card.append(card)
        cards_used.append(card)
    return (user_card, cards_used)

def card1(cards_used, user_cards):
    num = number()
    symbol = color()
    card = str(num) + " of " + symbol
    while card in cards_used:
        num = number()
        symbol = color()
        card = str(num) + " of " + symbol
    cards_used.append(card)
    user_cards.append(card)
    return (user_cards, cards_used)    
