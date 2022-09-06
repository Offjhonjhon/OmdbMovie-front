import { useLoading, ThreeDots } from '@agney/react-loading';


const ThreeDotsLoader = ({size}) => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width={size} />,
});

  return (
    <>
    <section {...containerProps}>
        {indicatorEl} {/* renders only while loading */}
    </section>
</>
  )
}

export default ThreeDotsLoader