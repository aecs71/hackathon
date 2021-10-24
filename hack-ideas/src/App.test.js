import { render, screen,fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ChallengeStore from './pages/dashboard/ChallengeStore';
import Dashboard from './pages/dashboard/Dashboard';
import UserStore from './pages/UserStore';
beforeAll(() => {
  localStorage.setItem('isLoggedin',12345);
  localStorage.setItem('challenges',"[]")
   UserStore.addUser(12345);
   ChallengeStore.addChallenge({title:"Test title",desc:"Test desc",tags:["Test1","Test2"]})
  
})

test('renders Dashboard page with a challenges', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText('Test title');
  expect(linkElement).toBeInTheDocument();
});
test('renders Dashboard page with challenge and upvote 0', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText('0');
  expect(linkElement).toBeInTheDocument();
});
test('Upvote increases value from 0 to 1', () => {
  render(<Dashboard />);
  fireEvent.click(screen.getByText('0'));
  const linkElement = screen.getByText('1')
 
  expect(linkElement).toBeInTheDocument();
});
test('sort by date created', () => {
  ChallengeStore.addChallenge({title:"Test title2",desc:"Test desc",tags:["Test1","Test2"]})
  const {container}=render(<Dashboard />);
  fireEvent.click(screen.getByText('Sort By'));
  act(() => {
    fireEvent.click(screen.getByText('Date Created'));
  });
  
  const linkElement = container.getElementsByClassName('card-title');
  expect(linkElement.length).toBe(2);
  expect(linkElement[0].innerHTML).toBe('Test title2');
});
