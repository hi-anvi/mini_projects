"""Code to run the bot"""

import dirty_seven
import cards
import random

def play_card(bot_cards, card_down, cards_used, jcolor, last_card):
    """Gives the card which bot will put."""

    num_tries = 0
    ran = random.randint(0, len(bot_cards) - 1)
    (num_down, color_down) = dirty_seven.seperate(card_down)
    (num, color) = dirty_seven.seperate(bot_cards[ran])

    if last_card == ["user", 1]:
        if num_down == "7":
            (bot_cards, cards_used) = cards.cards(2, cards_used, bot_cards)
            return (bot_cards, card_down, cards_used, last_card, jcolor)
        elif num_down == "Ace":
            return (bot_cards, card_down, cards_used, last_card, jcolor)

    if num_down == "Jake":
        color = jcolor
    
    while color != color_down and num != num_down:
        ran = random.randint(0, len(bot_cards) - 1)
        (num, color) = dirty_seven.seperate(bot_cards[ran])
        if num_down == "Jake":
            color = jcolor
        num_tries += 1
        if num_tries >= len(bot_cards) * 10:
            if last_card == ["bot", 1]:
                last_card = ["bot", 0]
            (bot_cards, cards_used) = cards.card1(cards_used, bot_cards)
            return (bot_cards, card_down, cards_used, last_card, jcolor)

    if num == "Jake":
        jcolor = cards.color()
    card_down = bot_cards[ran]
    last_card = ["bot", 1]
    bot_cards.remove(bot_cards[ran])
    return (bot_cards, card_down, cards_used, last_card, jcolor)
