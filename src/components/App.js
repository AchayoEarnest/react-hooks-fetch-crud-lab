import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestion] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((r) => r.json())
      .then((data) => setQuestion(data));
  }, []);

  const handleAddQuestion = (question) =>{
    setQuestion([...questions, question])
   }
   
   const handleOnDelete = (questionId)=>{
     setQuestion(questions.filter((question) => question.id !== questionId));
   }
   const handleUpdate = (updatedItem)=> {
   setQuestion(questions.map((question) => 
   updatedItem.id === questions.id ? updatedItem : question))
   }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      { page === "Form" ? <QuestionForm onAddQuestion={ handleAddQuestion } /> : <QuestionList questions={questions} onDeleteQuestion={handleOnDelete} handleUpdate={handleUpdate}/> };
    </main>
  );
}

export default App;
