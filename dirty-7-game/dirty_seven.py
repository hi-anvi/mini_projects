"""Rules to Dirty seven"""

import cards

def if_special(card_down, user_cards, cards_used, last_card):
    """If card is special(except jake) the returns cards used, user cards and whose turn it is."""
    
    (num, color) = seperate(card_down)
    if last_card == ["bot", 1]:
        if num == "7":
            print("Your opponent threw a 7. You picked up 2 cards. :(")
            (cards_used, user_cards) = cards.cards(2, cards_used, user_cards)
            return (cards_used, user_cards, True)
        elif num == "Ace":
            print("Oops! Your turn is skipped. :(")
            return (cards_used, user_cards, True)
    return (cards_used, user_cards, False)

def jake_down():
    color = input("You threw a jack! Which color do you want? ")
    while color != "Diamonds" and color != "Clubs" and color != "Hearts" and color != "Spades":
        color = input("Error! Which color do you want? ")
    return color

def seperate(card):
    """Seperates string and number. Card should be a string."""
    # Seperates the number
    if "King" in card:
        num = "King"
    elif "Queen" in card:
        num = "Queen"
    elif "Jake" in card:
        num = "Jake"
    elif "Ace" in card:
        num = "Ace"
    else:
        num = card[0]
    
    # Seperates the color
    if "Diamonds" in card:
        color = "Diamonds"
    elif "Hearts" in card:
        color = "Hearts"
    elif "Spades" in card:
        color = "Spades"
    else:
        color = "Clubs"

    return (num, color)

def put_card(user_cards, card_below, cards_used, color, last_card):
    """Returns the card below put by the user. user_cards should be a list"""
        
    (num_below, color_below) = seperate(card_below)
    num_tries = 0
    
    print("---------------------")
    print("Your cards:-")
    print(*user_cards, sep = "\n")
    print("Card below: " + card_below)
    if num_below == "Jake":
        color_below = color
        print("Color changes to " + str(color))
    (cards_used, user_cards, no_go) = if_special(card_below, user_cards, cards_used, last_card)
    if no_go:
        print("Turn over.")
        return (card_below, user_cards, cards_used, color, last_card)
    pick = input("Do you want to pick a card? ")
    if pick == "yes":
        (user_cards, cards_used) = cards.card1(cards_used, user_cards)
        return (card_below, user_cards, cards_used, color, last_card)
    
    put_down = input("Which card do you want to put down? ")
    
    while put_down not in user_cards:
        put_down = input("Invalid. Which card do you want to put down? ")
        
    (put_num, put_color) = seperate(put_down)
    
    while put_num != num_below and put_color != color_below or put_down not in user_cards:
        print("----------------")
        num_tries += 1
        put_down = input("Invalid. Which card do you want to put down? ")
        while put_down not in user_cards:
            print("-----------------")
            put_down = input("Not in cards! Which card do you want to throw: ")
        (put_num, put_color) = seperate(put_down)
        if num_tries >= 1:
            print("-----------------")
            print("Tried too many times. You have to pick a card.")
            (user_cards, cards_used) = cards.card1(cards_used, user_cards)
            return (card_below, user_cards, cards_used, color, last_card)
        

    if put_num == "Jake":
        color = jake_down()
        
    card_below = put_down
    last_card = ["user", 1]
    user_cards.remove(put_down)
    return (card_below, user_cards, cards_used, color, last_card)
