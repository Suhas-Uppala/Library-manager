import React, { useState } from 'react';

function OwnerDashboard({ user, logout, books, transactions, addBook, deleteBook }) {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    quantity: 1
  });

  const handleNewBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBook = () => {
    addBook(newBook);
    setNewBook({ title: '', author: '', isbn: '', quantity: 1 });
  };

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
        <h2 className="text-xl font-bold mb-4">Add New Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="title"
            value={newBook.title}
            onChange={handleNewBookChange}
            type="text" 
            placeholder="Book Title" 
            className="brutal-box p-2" 
          />
          <input 
            name="author"
            value={newBook.author}
            onChange={handleNewBookChange}
            type="text" 
            placeholder="Author" 
            className="brutal-box p-2" 
          />
          <input 
            name="isbn"
            value={newBook.isbn}
            onChange={handleNewBookChange}
            type="text" 
            placeholder="ISBN" 
            className="brutal-box p-2" 
          />
          <input 
            name="quantity"
            value={newBook.quantity}
            onChange={handleNewBookChange}
            type="number" 
            placeholder="Quantity" 
            className="brutal-box p-2" 
          />
        </div>
        <button onClick={handleAddBook} className="brutal-button w-full mt-4 p-2">Add Book</button>
      </div>

      <div className="brutal-box p-6">
        <h2 className="text-xl font-bold mb-4">Manage Books</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Author</th>
                <th className="p-2 text-left">ISBN</th>
                <th className="p-2 text-left">Available</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id} className="border-b border-black">
                  <td className="p-2">{book.title}</td>
                  <td className="p-2">{book.author}</td>
                  <td className="p-2">{book.isbn}</td>
                  <td className="p-2">{book.quantity}</td>
                  <td className="p-2">
                    <button 
                      onClick={() => deleteBook(book._id)} 
                      className="brutal-button px-3 py-1"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="brutal-box p-6">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Book</th>
                <th className="p-2 text-left">Action</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction._id} className="border-b border-black">
                  <td className="p-2">{transaction.userName}</td>
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

export default OwnerDashboard;
