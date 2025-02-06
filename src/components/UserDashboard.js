import React from 'react';

function UserDashboard({ user, logout, books, userBooks, userTransactions, borrowBook, returnBook }) {
  return (
    <div className="space-y-6">
      <div className="brutal-box p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Brutal Library Manager</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="brutal-button px-4 py-2">Logout</button>
        </div>
      </div>

      <div className="brutal-box p-6">
        <h2 className="text-xl font-bold mb-4">Available Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map(book => (
            <div key={book._id} className="brutal-box p-4">
              <h3 className="font-bold">{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Available: {book.quantity}</p>
              <button 
                onClick={() => borrowBook(book._id)} 
                className="brutal-button w-full mt-2 p-2"
                disabled={book.quantity < 1}
              >
                {book.quantity < 1 ? 'Not Available' : 'Borrow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="brutal-box p-6">
        <h2 className="text-xl font-bold mb-4">My Borrowed Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userBooks.map(book => (
            <div key={book._id} className="brutal-box p-4">
              <h3 className="font-bold">{book.title}</h3>
              <p>Author: {book.author}</p>
              <button 
                onClick={() => returnBook(book.bookId)} 
                className="brutal-button w-full mt-2 p-2"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="brutal-box p-6">
        <h2 className="text-xl font-bold mb-4">My History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-2 text-left">Book</th>
                <th className="p-2 text-left">Action</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {userTransactions.map(transaction => (
                <tr key={transaction._id} className="border-b border-black">
                  <td className="p-2">{transaction.bookTitle}</td>
                  <td className="p-2">{transaction.action}</td>
                  <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
