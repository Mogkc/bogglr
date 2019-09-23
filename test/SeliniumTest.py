import unittest
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class ExpectedBoardConditions():

    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols

    def expect_grey(self, tile):
        self.assertEqual("tile btn btn-light", tile.get_attribute("class"))

    def expect_blue(self, tile):
        self.assertEqual("tile btn btn-info", tile.get_attribute("class"))

    def expect_green(self, tile):
        self.assertEqual("tile btn btn-success", tile.get_attribute("class"))

    # def expect_board_state(self, board, word):
    #     for tile in word:
    #         self.expect_green(tile)
    #     for x in range(-1, 1):
    #         for y in range(-1, 1):
    #             if x == 0 or y == 0:
    #                 pass
    #             # Check for boundary errors
    #             try:
    #                 self.expect_blue(board[x*self.cols + y])


class BogglrGamePlay(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_play_of_game(self):
        driver = self.driver
        driver.get("https://bogglr-game.herokuapp.com")
        # Wait until at least one tile has been generated
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".tile"))
        )
        # Name relevant dom objects to be tested
        current_word = driver.find_element_by_id("current")
        game_tiles = driver.find_elements_by_xpath("//button[@onclick='getLocation()']")
        submit_btn = driver.find_element_by_id("submit")
        done_btn = driver.find_element_by_id("done")
        # Test the initial state
        # Current string should prompt user to play
        self.assertEqual("Click on a letter to start a word!", current_word.text, "Wrong starting prompt")
        # Game tiles should be blue and each contain one uppercase letter
        self.assertEqual("tile btn btn-info", game_tiles[0].get_attribute("class"))
        self.assertIsNotNone(re.search("^[A-Z]$", game_tiles[0].text))
        # Submission buttons should be grey
        self.assertEqual("btn", submit_btn.get_attribute("class"))
        self.assertEqual("btn", done_btn.get_attribute("class"))
        # Start clicking on things
        # Clicking on the submit and done buttons should have no effect
        submit_btn.click()
        done_btn.click()
        self.assertEqual("btn", submit_btn.get_attribute("class"))
        self.assertEqual("btn", done_btn.get_attribute("class"))
        # Game should add letter when tile clicked
        game_tiles[0].click()
        self.assertEqual("Current String: " + game_tiles[0].text, current_word.text)
        self.assertEqual(game_tiles[0].get_attribute("class"), "tile btn btn-success")
        # Non-adjacent tiles should be grey and have no effect
        self.assertEqual(game_tiles[-1].get_attribute("class"), "tile btn btn-light")
        game_tiles[-1].click()
        self.assertEqual("Current String: " + game_tiles[0].text, current_word.text)
        self.assertEqual(game_tiles[0].get_attribute("class"), "tile btn btn-success")
        # Adjacent tiles should be blue and add letter when clicked
        self.assertEqual("tile btn btn-info", game_tiles[1].get_attribute("class"))
        game_tiles[1].click()
        self.assertEqual("Current String: " + game_tiles[0].text + game_tiles[1].text, current_word.text)
        self.assertEqual(game_tiles[0].get_attribute("class"), "tile btn btn-success")
        self.assertEqual(game_tiles[1].get_attribute("class"), "tile btn btn-success")

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
