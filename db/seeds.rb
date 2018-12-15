# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

first_problem = Problem.create(
  question: "Which of the following is equal to (14 - 2i)(7 + 2i)?  Remember i^2 = -1",
  difficulty: 2,
  answer: 4
)

first_problem.answers.create(text: "74", value: 1)
first_problem.answers.create(text: "122", value: 2)
first_problem.answers.create(text: "74 + 154i", value: 3)
first_problem.answers.create(text: "122 + 154i",value: 4)

second_problem = Problem.create(
  question: "What is the eighth digit of pi?",
  difficulty: 4,
  answer: 4
)

second_problem.answers.create(text: "0", value: 1)
second_problem.answers.create(text: "2", value: 2)
second_problem.answers.create(text: "5", value: 3)
second_problem.answers.create(text: "9",value: 4)

third_problem = Problem.create(
  question: "What is the area of a circle with a radius of 2?",
  difficulty: 1,
  answer: 2
)

third_problem.answers.create(text: "4", value: 1)
third_problem.answers.create(text: "4pi", value: 2)
third_problem.answers.create(text: "2pi", value: 3)
third_problem.answers.create(text: "16",value: 4)



