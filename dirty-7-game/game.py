import cards
import dirty_seven
import bot


print("Your goal in dirty seven is to finish your cards." 
      + " Your can put a card with the same number or the same color as the" 
      + " card below. If there is a jake below then you have to either play " 
      + "a jake or the color which the other player will tell. If you " 
      + "throw an ace then the other players turn is skipped. If you throw a " 
      + "7 then the other player has to pick 2 cards. Enjoy! " 
      + "\n------------------")

cards_used = []
user_card = []
bot_cards = []
color = 0
last_card = ["bot", 1]
turn = "user"
(card_down, cards_used) = cards.card1(cards_used, [])

while "7" in card_down[0] or "Ace" in card_down[0] or "Jake" in card_down[0]:
    cards_used = []
    (card_down, cards_used) = cards.card1(cards_used, [])

card_down = card_down[0]
turn = "user"

num_cards = int(input("Enter the amount of cards you need(1-10): "))
while num_cards < 1 or num_cards > 10:
    num_cards= int(input("Invalid Enter the amount of cards you need(1-10): "))
(user_card, cards_used) = cards.cards(num_cards, cards_used, user_card)
(bot_cards, cards_used) = cards.cards(num_cards, cards_used, bot_cards)
print(*user_card, sep = "\n")

while True:
    if len(cards_used) >= 52:
        print("All cards used up. Draw!")
        break
    (card_down, user_cards, cards_used, color, last_card) = dirty_seven.put_card(user_card, card_down, cards_used, color, last_card)
    if len(user_card) == 0:
        print("You won!!! Congrates!")
        break
    (bot_cards, card_down, cards_used, last_card, color) = bot.play_card(bot_cards, card_down, cards_used, color, last_card)
    if len(bot_cards) == 0:
        print("The bot put " + card_down + " and has no cards!!")
        print("You lost! :( ")
        break

print("------------------")
input("How much would you rate us out of 5? ")
print("Thanks for choosing us!")
