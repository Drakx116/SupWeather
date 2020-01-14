import * as React from "react";

export class PageNotFound extends React.Component {
    render() {
        return (
            <div>
                <h1 className="page-title"> Oh no ! Page not found :( </h1>

                <a href="/"> Home </a>
            </div>
        );
    }
}