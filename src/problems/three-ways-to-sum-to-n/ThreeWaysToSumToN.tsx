import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const listCodeString = [
    {
        title: 'Use a regular loop.',
        codeString: `
    var sum_to_n_a = function(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    };`,
    },
    {
        title: 'Use an arithmetic progression.',
        codeString: `
    var sum_to_n_b = function(n) {
        return (n * (n + 1)) / 2;
    };`,
    },
    {
        title: 'Using recursion.',
        codeString: `
    var sum_to_n_c = function(n) {
        if (n === 1) return 1;
        return n + sum_to_n_c(n - 1);
    };`,
    },
]

const ThreeWaysToSumToN = () => {
    return (
        <div className="">
            <h3 className="text-4xl mb-5 font-bold text-center">Three ways to sum to n:</h3>
            <div className="mt-5 flex gap-4">
                {listCodeString.map(({ codeString, title }, idx) => (
                    <div className="">
                        <h5 className="mb-2 font-bold text-xl">
                            {++idx}. {title}
                        </h5>
                        <SyntaxHighlighter language="typescript" customStyle={{ borderRadius: 8, height: '100%', width: 'max-content' }} style={a11yDark}>
                            {codeString}
                        </SyntaxHighlighter>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ThreeWaysToSumToN
