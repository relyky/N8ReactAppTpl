import ss from './MyCounter.module.css'

export default function MyCounter(props: {
  value: number,
  onChange: (newCount: number) => void
}) {
  return (
    <div className={ss.box}>
      <h3 className={ss.header}>全客製計數器</h3>
      <p className={ss.paragraph}>展示全客製元件與 CSS isolation。</p>
      <div className={ss.bigtext} >{props.value}</div>
      <button onClick={() => props.onChange(props.value + 1)}>＋１</button>
      <button onClick={() => props.onChange(props.value - 1)}>－１</button>
    </div>
  )
}