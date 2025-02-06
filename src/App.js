import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import OwnerDashboard from './components/OwnerDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsLoggedIn(true);
      loadData(parsedUser);
    }
  }, []);

  const loadData = async (currentUser) => {
    setLoading(true);
    try {
      // Fetch Books
      const booksResponse = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'read',
          collection: 'books'
        })
      });
      const booksData = await booksResponse.json();
      if (booksData.success) {
        setBooks(booksData.result);
      }

      // Fetch Transactions
      const transactionsResponse = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'read',
          collection: 'transactions',
          conditions: currentUser.role === 'user' ? { userId: currentUser._id } : {}
        })
      });
      const transactionsData = await transactionsResponse.json();
      if (transactionsData.success) {
        if (currentUser.role === 'user') {
          setUserTransactions(transactionsData.result);
        } else {
          setTransactions(transactionsData.result);
        }
      }

      // Fetch User Books (for user role)
      if (currentUser.role === 'user') {
        const userBooksResponse = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            appSlug: 'library-manager-123456',
            action: 'read',
            collection: 'borrowed_books',
            conditions: { userId: currentUser._id }
          })
        });
        const userBooksData = await userBooksResponse.json();
        if (userBooksData.success) {
          setUserBooks(userBooksData.result);
        }
      }
    } catch (error) {
      console.error('Load data error:', error);
      alert('Failed to load data');
    }
    setLoading(false);
  };

  const login = async (loginForm) => {
    setLoading(true);
    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'read',
          collection: 'users',
          conditions: loginForm
        })
      });
      const data = await response.json();
      if (data.success && data.result.length > 0) {
        const loggedInUser = data.result[0];
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setIsLoggedIn(true);
        loadData(loggedInUser);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
    setLoading(false);
  };

  const signup = async (signupForm) => {
    setLoading(true);
    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'create',
          collection: 'users',
          data: signupForm
        })
      });
      const data = await response.json();
      if (data.success) {
        const newUser = { ...signupForm, _id: data.result.insertedId };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoggedIn(true);
        loadData(newUser);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
    }
    setLoading(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  const addBook = async (newBook) => {
    setLoading(true);
    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'create',
          collection: 'books',
          data: newBook
        })
      });
      const data = await response.json();
      if (data.success) {
        loadData(user);
      }
    } catch (error) {
      console.error('Add book error:', error);
      alert('Failed to add book');
    }
    setLoading(false);
  };

  const deleteBook = async (bookId) => {
    setLoading(true);
    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'delete',
          collection: 'books',
          id: bookId
        })
      });
      const data = await response.json();
      if (data.success) {
        loadData(user);
      }
    } catch (error) {
      console.error('Delete book error:', error);
      alert('Failed to delete book');
    }
    setLoading(false);
  };

  const borrowBook = async (bookId) => {
    setLoading(true);
    try {
      const book = books.find(b => b._id === bookId);
      await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'update',
          collection: 'books',
          id: bookId,
          data: { quantity: book.quantity - 1 }
        })
      });

      await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'create',
          collection: 'borrowed_books',
          data: {
            userId: user._id,
            bookId: bookId,
            title: book.title,
            author: book.author
          }
        })
      });

      await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'create',
          collection: 'transactions',
          data: {
            userId: user._id,
            userName: user.name,
            bookId: bookId,
            bookTitle: book.title,
            action: 'borrowed',
            date: new Date()
          }
        })
      });

      loadData(user);
    } catch (error) {
      console.error('Borrow book error:', error);
      alert('Failed to borrow book');
    }
    setLoading(false);
  };

  const returnBook = async (bookId) => {
    setLoading(true);
    try {
      const book = books.find(b => b._id === bookId);
      await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'update',
          collection: 'books',
          id: bookId,
          data: { quantity: book.quantity + 1 }
        })
      });

      await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'delete',
          collection: 'borrowed_books',
          conditions: {
            userId: user._id,
            bookId: bookId
          }
        })
      });

      await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/mongodb', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer rr6bqil5mbXq0drB0ABahp2I76B2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appSlug: 'library-manager-123456',
          action: 'create',
          collection: 'transactions',
          data: {
            userId: user._id,
            userName: user.name,
            bookId: bookId,
            bookTitle: book.title,
            action: 'returned',
            date: new Date()
          }
        })
      });

      loadData(user);
    } catch (error) {
      console.error('Return book error:', error);
      alert('Failed to return book');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage login={login} signup={signup} />;
  }

  return (
    <div className="p-4">
      {user.role === 'owner' ? (
        <OwnerDashboard 
          user={user} 
          logout={logout} 
          books={books} 
          transactions={transactions} 
          addBook={addBook} 
          deleteBook={deleteBook} 
        />
      ) : (
        <UserDashboard 
          user={user} 
          logout={logout} 
          books={books} 
          userBooks={userBooks} 
          userTransactions={userTransactions} 
          borrowBook={borrowBook} 
          returnBook={returnBook} 
        />
      )}
    </div>
  );
}

export default App;
