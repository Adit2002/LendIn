import argparse
import pickle
import numpy as np

# Load the model
model = pickle.load(open('C:\\Users\\HP\\Documents\\GitHub\\LendIn\\server\\gen_model\\xgboost_model.pkl', 'rb'))

# Parse command-line arguments
parser = argparse.ArgumentParser(description='Run XGBoost model with given features')
parser.add_argument('annual_inc', type=float, help='Annual income')
parser.add_argument('dti', type=float, help='Debt-to-income ratio')
parser.add_argument('inq_last_6mths', type=int, help='Inquiries in last 6 months')
parser.add_argument('open_acc', type=int, help='Number of open accounts')
parser.add_argument('total_acc', type=int, help='Total number of accounts')
parser.add_argument('revol_util', type=float, help='Revolving line utilization rate')
parser.add_argument('total_pymnt', type=float, help='Total payment received')
parser.add_argument('grade_encoded', type=int, help='Encoded grade')
parser.add_argument('loan_amnt', type=float, help='Loan amount')
parser.add_argument('term_months', type=int, help='Term in months')
parser.add_argument('emp_length_years', type=int, help='Employment length in years')
parser.add_argument('installment', type=float, help='Monthly payment')

args = parser.parse_args()

# Populate arg_array with command-line arguments
arg_array = [
    args.annual_inc,
    args.dti,
    args.inq_last_6mths,
    args.open_acc,
    args.total_acc,
    args.revol_util,
    args.total_pymnt,
    args.grade_encoded,
    args.loan_amnt,
    args.term_months,
    args.emp_length_years,
    args.installment
]

# Convert arg_array to a numpy array
features_np = np.array(arg_array).reshape(1, -1)

# Make predictions
predictions = model.predict(features_np)
print(predictions[0])
