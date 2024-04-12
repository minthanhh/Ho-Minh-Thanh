import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const codeString = `
import { getPriority } from '@/utilities/get-priority';
import { WalletBalance } from '@/types/wallet-balance';

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = ({ children, ...rest }: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
            .filter((balance: WalletBalance) => {
              if (getPriority(balance.blockchain) > -99 && balance.amount <= 0) return true;
              return false;
            }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                if (leftPriority > rightPriority) return -1;
                return 1;
            });
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance: WalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        const formattedAmount = balance.amount.toFixed();
        return (
          <WalletRow
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={formattedAmount}
          />
        )
      })}
    </div>
  )
}
`

const MessyReact = () => {
    return (
        <div className="flex justify-between">
            <SyntaxHighlighter language="typescript" customStyle={{ height: 700, marginTop: 20, borderRadius: 12 }} style={a11yDark}>
                {codeString}
            </SyntaxHighlighter>

            <div className="w-[40%] p-3">
                <h3 className="text-3xl font-bold">List of Ineffective Points:</h3>
                <div className="mt-2">
                    <ol className="list-disc">
                        <li className="ml-5 mb-2">
                            <p>If only using hooks, I will destructure props within the Component's params.</p>
                            <span className="block">
                                <strong>Explaining further:</strong> Avoid adding unnecessary lines.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            <p>I will remove complex nested conditions and prioritize checking for the worst-case scenario first.</p>
                            <span className="block">
                                <strong>Explaining further:</strong> The code will be easier to read and manage.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            The FormattedWalletBalance interface can extend WalletBalance.
                            <span className="block">
                                <strong>Explaining further:</strong> When lacking other necessary properties for WalletBalance, it's unnecessary to add them to both interfaces.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            In sortedBalances, it doesn't use prices at all, so I can remove it from the dependencies.
                            <span className="block">
                                <strong>Explaining further:</strong> Avoid incorrect calculation functions when there are redundant dependencies.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            Loại bỏ hàm formattedBalances.
                            <span className="block">
                                <strong>Explaining further:</strong> It's possible to formatBalances within the loop of rows.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            Loại bỏ biến rows và đưa code xuống return.
                            <span className="block">
                                <strong>Explaining further:</strong> The code will be more concise and avoid adding an extra line.
                            </span>
                        </li>
                    </ol>
                </div>
                <p>However, there are other issues here depending on the scale of the component and the clarity of each logic operation, which need to be clearly defined.</p>
            </div>
        </div>
    )
}

export default MessyReact
