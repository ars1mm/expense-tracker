import { formatCurrency } from '../utils/currency'

const ExpensesList = ({ expenses }) => {
  return (
    <div className="space-y-4">
      {expenses.map((expense, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg">ден</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{expense.description}</h3>
              <p className="text-sm text-gray-500">{expense.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">{formatCurrency(expense.amount)}</p>
            <p className="text-sm text-gray-500">{expense.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpensesList;
