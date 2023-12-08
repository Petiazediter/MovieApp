import * as Styled from "./styles"

type Props = {
    text: string
}

const InfoBox = ({ text }: Props) => {
    return <Styled.Box>{text}</Styled.Box>
}

export default InfoBox