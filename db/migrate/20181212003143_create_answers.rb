class CreateAnswers < ActiveRecord::Migration[5.1]
  def change
    create_table :answers do |t|
      t.references :problem, foreign_key: true
      t.string :text

      t.timestamps
    end
  end
end
