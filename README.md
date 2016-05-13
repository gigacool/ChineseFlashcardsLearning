# Chinese Learning Flashcards

This small project aims at providing a simple web application to practice Chinese characters learning.

In order to provide graduated learning and relying on current state of the art learning set, we will be using the core HSK level 1 to 6 flashcard sets.

## planed features
This project is meant in multiple steps. The overall aim is to provide a simple tool to help learning Chinese characters using the flashcard principle.

The dictionary used will (probably) be CEDICT with an emphasis made on characters from HSK data set. Later options may involve other languages support such as french one.

Step 0 involves a classical web site application where user creates an account. Possible second step involves transition to Electron based full client side application.

0. prepare backend
 * [x] *prepare database to query dictionary*
 * [x] *create (first version of) RESTful API to access resources*
1. explore Chinese characters
 * [ ] *display word of the day on welcome*
 * [ ] *display flashcards* with pagination
 * [ ] *filter flashcards* by level
 * [ ] *filter a flashcard* by name (English/Chinese)
2. create character lists
 * [ ] *create flashcards lists* with name
 * [ ] *edit flashcard list* rename/display
 * [ ] *add/remove* cards to lists
3. Play flashcard training
 * [ ] *select flashcard for training*
 * [ ] *play flashcards* associate success
4. User management
 * [ ] *create user* with credentials
 * [ ] *remove user* with associated data
5. User learning progress monitoring
 * [ ] *associate flashcard lists to user*
 * [ ] *record flashcards training successes*
 * [ ] *create statistics*
 * [ ] *provide progress data*
 * [ ] *provide global learning data*
6. Machine learning : improve learning
 * [ ] *create revision lists*
 * [ ] *identify easy and hard words*
 * [ ] *identify contexts for hard words to learn easier*
 * [ ] *propose sets to maximize learning*
 * [ ] *propose sets to help learning hard words*

## technical aspects
I do not plan on using fancy technologies in this project and will go for classical and reliable ones: *backbone.js, require.js, handlebars.js, underscore.js, jquery, et. al.*

I would like to investigate the possibility to relive long forgotten functional programming practice to see about potential benefits.

I also wish to investigate for user management in either a simple way or a clean way (using e.g. filters (?)).

### Open questions

* What DBMS to use ?
* Do we need REST API for all possible resources or can we tune something specific (issue comes from dataset being large if all characters are taken into account, data is much more reasonable for HSK data only).
