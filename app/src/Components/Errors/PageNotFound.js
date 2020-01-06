import * as React from "react";

export class PageNotFound extends React.Component {
    render() {
        return (
            <div>
                <h2> This page doesn't exist :/ </h2>

                <a href="/"> Home </a>
            </div>
        );
    }
}