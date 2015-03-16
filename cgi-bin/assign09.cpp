#include <iostream>
#include <cstdlib>
#include <cstdio>
#include <string>
#include <cmath>
#include <vector>
#include <sstream>
using namespace std;

/**
 * CALCULATE
 * This will calculate the monthly payment based on the apr,
 * loan term, and loan amount.
 * 
 * @param  apr        the interest for the loan
 * @param  loanTerm   how many years you will hold the term
 * @param  loanAmount how much the loan was for
 * @return            the monthly payment
 */
double calculate(double apr, double loanTerm, double loanAmount) {
	double monthlyPayment = 0;
	double numPayments = loanTerm * 12;
	double mRate = (apr / 100) / 12;
	double tmp = pow(1 + mRate, numPayments);

	if (mRate != 0)
	{
		monthlyPayment = loanAmount * (mRate * tmp / (tmp - 1));
	}
	else
	{
		monthlyPayment = loanAmount / numPayments;
	}

	return monthlyPayment;
}

/**
 * PARSE QUERY
 * This will parse our GET query so that we have all our
 * arrays split
 */
vector<string> parseQuery(string str) {
	vector<string> result;

	stringstream data(str);
	string line;

	// split the string on the & sign
	while(getline(data, line, '&')) {
		stringstream variables(line);
		string value;
		// split the string on the = sign
		while(getline(variables, value, '=')) {
			result.push_back(value);
		}
	}

	return result;
}

int main() {
	// Get the query
	string query = getenv("QUERY_STRING");

	// Parse it.
	vector<string> result = parseQuery(query);

	// Set variables.
	double apr = stod(result[1]);
	double loanTerm = stod(result[3]);
	double loanAmount = stod(result[5]);

	// Get Monthly Payment
	double monthlyPayment = calculate(apr, loanTerm, loanAmount);

	// Return the monthly payment value back to the sender;
	cout << "Content-type: text/html \n\n";

	printf("%.2f", monthlyPayment);

	return 0;
}