class ProblemsController < ApiController

  # GET /problems
  def index
    @problems = Problem.select("id, question").all

    render json: @problems.to_json
  end

  # GET /problems/1
  def show
    @problem = Problem.find(params[:id])
    render json: @problem.to_json(:include => { :answers => { :only => [:id, :text] }})
  end

end
