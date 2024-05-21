import React from 'react';
import './App.css';
import './assets/styles/main.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import {DynamicContextProvider} from "./utils/DynamicContextProvider";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage/PostsPage";
import FavoritePostsPage from "./pages/FavoritePostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import ManagePage from "./pages/ManagePage";
import CreatePostPage from "./pages/CreatePostPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import Footer from "./components/Footer";

function App() {
  return (
      <Provider store={store}>
        <DynamicContextProvider>
          <Router>
            <Header/>
            <div style={{marginBottom: "100px"}}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/favorite-posts" element={<FavoritePostsPage />} />
                <Route path="/post/:postId" element={<PostDetailPage />} />
                <Route path="/manage/posts" element={<ManagePage />} />
                <Route path="/manage/posts/create" element={<CreatePostPage />} />
                <Route path="/manage/posts/edit/:postId" element={<CreatePostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                {/*<Route path="/about" element={<About />} />*/}
              </Routes>
            </div>
            <Footer />
          </Router>
        </DynamicContextProvider>
      </Provider>
  );
}

export default App;
