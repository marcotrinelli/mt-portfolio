import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
// import EducationComponent from "../pages/education/EducationComponent";
// import Experience from "../pages/experience/Experience";
// import Contact from "../pages/contact/ContactComponent";
// import Projects from "../pages/projects/Projects";
import Error from "../pages/error/Error";
import GoToTop from "../components/goToTop/goToTop";

const wip = {
    title: "Work in progress",
    subtitle: "",
    description: "This page is not ready yet!"
}

const notfound = {
    title: "Woops",
    subtitle: "404",
    description: "The requested page is unavailable :("
}

export default function Main() {
    return (
        <>
            <BrowserRouter>
                <GoToTop>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/home"
                            element={<Home />}
                        />
                        <Route
                            path="/experience"
                            element={<Error {...wip} />}
                        // element={<Experience theme={this.props.theme} />}
                        />
                        <Route
                            path="/education"
                            element={<Error {...wip} />}
                        // element={<EducationComponent theme={this.props.theme} />}
                        />
                        <Route
                            path="/contact"
                            element={<Error {...wip} />}
                        // element={<Contact theme={this.props.theme} />}
                        />
                        <Route
                            path="/projects"
                            element={<Error {...wip} />}
                        // element={<Projects theme={this.props.theme} />}
                        />
                        <Route
                            path="/hobbies"
                            element={<Error {...wip} />}
                        // element={<Projects theme={this.props.theme} />}
                        />
                        <Route
                            path="*"
                            element={<Error {...notfound} />}
                        />
                    </Routes>
                </GoToTop>
            </BrowserRouter>
        </>
    );

}
