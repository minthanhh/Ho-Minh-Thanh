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
                <h3 className="text-3xl font-bold">Danh sách những điểm kém hiệu quả:</h3>
                <div className="mt-2">
                    <ol className="list-disc">
                        <li className="ml-5 mb-2">
                            <p>Nếu chỉ với mục đích sử dụng các hooks thì props sẽ được tôi destructuring trên params của Component.</p>
                            <span className="block">
                                <strong>Giải thích:</strong> Tránh thêm dòng không cần thiết.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            <p>Tôi sẽ loại bỏ những điều kiện lòng cấp gây khó hiểu và ưu tiên kiểm tra điều kiện xấu nhất trước.</p>
                            <span className="block">
                                <strong>Giải thích:</strong> Code sẽ dễ đọc và kiểm soát.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            Interface FormattedWalletBalance có thể extend WalletBalance
                            <span className="block">
                                <strong>Giải thích:</strong> Khi thiếu property cần thiết khác cho WalletBalance không phải đi thêm ở cả hai interface.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            Trong sortedBalances nó không hề sử dụng prices vì vậy tôi có thể loại bỏ nó ra khỏi deps
                            <span className="block">
                                <strong>Giải thích:</strong> Tránh hàm tính toán sai lệch khi có deps bị thừa
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            Loại bỏ hàm formattedBalances.
                            <span className="block">
                                <strong>Giải thích:</strong> Có thể formatBalances trong lúc loop rows.
                            </span>
                        </li>
                        <li className="ml-5 mb-2">
                            Loại bỏ biến rows và đưa code xuống return.
                            <span className="block">
                                <strong>Giải thích:</strong> Trong code sẽ gọn hơn và tránh tốn thêm một dòng.
                            </span>
                        </li>
                    </ol>
                </div>
                <p>Tuy nhiên có một số vấn đề khác ở đây tùy thuộc vào mức độ scale của component và độ rõ ràng của từng logic hoạt động cần phải được xác định rõ.</p>
            </div>
        </div>
    )
}

export default MessyReact
