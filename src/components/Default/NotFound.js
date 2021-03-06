import React, { Component } from 'react';
import { Link } from '@reach/router';

class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>Not found</h2>
                <p>Sorry, nothing here.</p>
                <Link to="/">Go back to the main page.</Link>
            </div>
        );
    }
}

export default NotFound;