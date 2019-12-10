import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class QuizBee extends Component {
	state = {
		questionBank: [],
		score:0,
		responses: 0
	};

	getQuestions = () => {
		quizService().then(question => {
			this.setState({
				questionBank: question
			});
		});
	};

// We used the componentDidMount lifeCycleMethod to bring in a set of question objects
// from our API and we populate a state variable with this data.
// We then rendered the question from this data in our jsx template.
// any changes made to the questionBank array would automatically signal an update,
// causing the component to re-render with the updated data.

computeAnswer = (answer, correctAnswer) => {
	if (answer === correctAnswer) {
		this.setState({
			score: this.state.score +1
		});
	}
	this.setState({
		responses: this.state.responses <5 ? this.state.responses + 1 : 5
	});
};

playAgain =() => {
	this.getQuestions();
	this.setState({
		score:0,
		responses:0
	});
};
	componentDidMount() {
		this.getQuestions();
	}

	render () {
		return (
			<div className="container">
			 <div className="title">QuizBee</div>
			 {this.state.questionBank.length > 0 &&
			  this.state.responses <5 &&
			  this.state.questionBank.map(
			  	({question,answers,correct, questionId}) => (
			  		<QuestionBox
			  		 question={question}
			  		 options={answers}
			  		 key={questionId}
			  		 selected={answer =>this.computeAnswer(answer, correct)}
			  		 />
			  	)
			  		
			  		)}
				{this.state.responses ===5 ? (
					<Result score= {this.state.score} playAgain={this.playAgain} />
					) : null}

			</div>
			);
	}
}
ReactDOM.render(<QuizBee />,document.getElementById("root"));