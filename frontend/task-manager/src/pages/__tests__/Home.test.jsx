import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Home from '../Home';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Modal from 'react-modal';

jest.mock('axios');

const mockStore = configureStore();
const store = mockStore({
    auth: {
        currentUser: {
            data: {
                username: 'testuser',
            },
            access_token: 'your_access_token',
        },
    },
});

Modal.setAppElement(document.createElement('div'));
const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

describe('Home Component', () => {

    it('displays loading message while fetching tasks', async () => {
        axios.get.mockResolvedValue({
            data: [],
        });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        // Loading message should be displayed
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for the component to finish loading
        await waitFor(() => {
            expect(screen.getByText('User: testuser')).toBeInTheDocument();
        });
    });

    it('can add a task', async () => {
        axios.post.mockResolvedValue({
            data: {
                id: 1,
                title: 'New Task Title',
                description: 'Task Description',
                due_date: '2023-12-31',
                status: 'Not Started',
                tags: 'Tag1,Tag2',
            },
        });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );


        // Test Click the "Add Task" button to open the add task modal
        fireEvent.click(screen.getByText('Add'));

        // Fill in the form fields
        fireEvent.change(screen.getByPlaceholderText('Task Title'), {
            target: { value: 'New Task Title' },
        });

        fireEvent.change(screen.getByPlaceholderText('Task Description'), {
            target: { value: 'Task Description' },
        });

        fireEvent.change(screen.getByPlaceholderText('Not Started, PENDING, COMPLETED'), {
            target: { value: 'Not Started' },
        });

        fireEvent.change(screen.getByPlaceholderText('Add tag/Category'), {
            target: { value: 'Tag1,Tag2' },
        });

        fireEvent.change(screen.getByPlaceholderText('mm/dd/yyy'), {
            target: { value: '2023-12-31' },
        });

        // Click the "Save" button to add the task
        fireEvent.click(screen.getByText('Save'));


        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Task created successfully');
            alertMock.mockRestore()
        });
    });

    it('can edit a task', async () => {
        // Mock the response for editing a task
        axios.put.mockResolvedValue({
            data: {
                id: 1,
                title: 'Updated Task Title',
                description: 'Updated Task Description',
                due_date: '2023-12-31',
                status: 'Updated Status',
                tags: 'Tag1,Tag2',
            },
        });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        // Check if there are tasks available before trying to edit
        //So we can have as many edit buttons depending on the number of tasks avaiable in the task array
        const editButtons = screen.queryAllByText('Edit');


        if (editButtons.length > 0) {
            // Click the "Edit" button to open the edit task modal for the first task
            fireEvent.click(editButtons[0]);

            // Fill in the form fields within the edit modal
            fireEvent.click(screen.getByText('Edit'));

            fireEvent.change(screen.getByPlaceholderText('Not Started, PENDING, Done'), {
                target: { value: 'Updated Status' },
            });

            fireEvent.change(screen.getByPlaceholderText('Due Date'), {
                target: { value: '2023-12-31' },
            });

            fireEvent.click(screen.getByText('Save'));

            await waitFor(() => {
                expect(alertMock).toHaveBeenCalledWith('Task with updated successfully');
                alertMock.mockRestore()
            });

        } else {
            console.log('No tasks available for editing');
        }
    });
});
