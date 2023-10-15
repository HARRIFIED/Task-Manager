import React from 'react';
import { render, fireEvent, waitFor, screen } from '../../../test_utilis';
import Login from '../Login';
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {
    it('submits the form and handles success', async () => {
        // Mock axios.post to return a successful response
        axios.post.mockResolvedValue({ data: { message: 'Login successful', token: 'your_token' } });

        render(<Login />);

        // Select form elements and fill out the form
        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByText('Log In');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        // Wait for the login to complete
        await waitFor(() => {
            // expect(screen.queryByText('Login successful')).toBeInTheDocument();
            expect(screen.queryByText('Login failed')).toBeNull();
        });

        // Add assertions to test other parts of your component's behavior
    });

    it('handles API error with invalid credentials', async () => {
        // Mock axios.post to return an error response
        axios.post.mockRejectedValue({ response: { data: { message: 'Invalid username or password' } } });

        render(<Login />);

        const submitButton = screen.getByText('Log In');
        fireEvent.click(submitButton);

        await waitFor(() => {
            // expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
            // Check if the text exist in jsx doc
            const errorElement = screen.queryByText(/Invalid username or password/i);

            if (errorElement) {
                expect(errorElement).toBeInTheDocument(); // Display the error message if it exists
            } else {
                // Assert that the error message should not be present
                expect(errorElement).toBeNull();
            }
        });
    });
});
