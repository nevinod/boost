class CreateProblems < ActiveRecord::Migration[5.1]
  def change
    create_table :problems do |t|
      t.string :question
      t.integer :difficulty
      t.integer :correct

      t.timestamps
    end
  end
end
