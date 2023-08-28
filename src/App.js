import { createContext, useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Home from "./components/pages/Home/Home";
import Header from "./components/features/Header/Header";
import { Routes, Route } from "react-router-dom";
import { getUserData } from "./components/services/userServices";
import LoginUser from "./components/pages/LoginUser/LoginUser";
import MainSection from "./components/features/MainSection/MainSection";
import ToDoList from "./components/pages/ToDoList/ToDoList";
import Footer from "./components/features/Footer/Footer";


export const appContext = createContext(null);

export const baseUrl = "https://879c-181-59-236-16.ngrok-free.app";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [noteFilter, setNoteFilter] = useState(
    {
      isArchived: false,
      categoryId: 0,
    }
  );

  useEffect(() => {
    setCurrentUser(getUserData());
    console.log("current user ", currentUser);
  }, []);

  return (
    <div className="App">
      <appContext.Provider value={{ currentUser, setCurrentUser, noteFilter, setNoteFilter }}>
        <Header />
        <Routes>
          <Route element={<Home />} path={"/"} />
          <Route element={<Home />} path={"/home"} />
          <Route element={<LoginUser />} path={"/loginUser"} />
          <Route
            element={
              <MainSection>
                <ToDoList />
              </MainSection>
            }
            path={`/todolist`}
          />
        </Routes>
        <Footer />
      </appContext.Provider>
    </div>
  );
}

export default App;
