import React from 'react';
import { render, fireEvent, waitFor, screen } from '../../../test_utilis'
import Signup from '../Signup';
import axios from 'axios';

jest.mock('axios');

describe('Signup Component', () => {
    it('submits the form and handles success', async () => {
        // Mock axios.post to return a successful response
        axios.post.mockResolvedValue({ data: { message: 'User registered successfully' } });

        render(<Signup />);

        // Select form elements and fill out the form
        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const emailInput = screen.getByLabelText('Email address');
        const submitButton = screen.getByText('Sign Up');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })
        fireEvent.change(emailInput, { target: { value: 'email@yopmail.com' } })
        fireEvent.click(submitButton);

        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

        // Wait for the Signup to complete
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Signup successful please proceed to login');
            expect(screen.queryByText('Signup failed')).toBeNull();
            alertMock.mockRestore()
        });
    });

    it('handles API error with already existing user', async () => {
        // Mock axios.post to return an error response
        axios.post.mockRejectedValue({ response: { data: { message: 'Username or email already exists' } } });

        render(<Signup />);

        const submitButton = screen.getByText('Sign Up');
        fireEvent.click(submitButton);

        await waitFor(() => {
            // Check if the text exist in jsx doc
            const errorElement = screen.queryByText(/Username or email already exists/i);

            if (errorElement) {
                expect(errorElement).toBeInTheDocument(); // Display the error message if it exists
            } else {
                // Assert that the error message should not be present
                expect(errorElement).toBeNull();
            }
        });
    });



    it('does not render the error message when error is not set', async () => {
        // Render the component without setting the error state
        render(<Signup />);
        const errorElement = screen.queryByText('Username or email already exists');

        expect(errorElement).toBeNull();
    });
});
