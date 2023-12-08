import { FormEvent, memo, useState } from 'react'
import Styled from './styles'

type Props = {
    onChangeValueListener: (value: string) => void
}

const SearchBox = (props: Props) => {

    const [searchValue, setSearchValue] = useState<string>('')

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.onChangeValueListener(searchValue)
    }

    return (<form onSubmit={onSubmit}>
        <Styled.SearchBox 
            onChange={(v) => setSearchValue(v.currentTarget.value)}
            type='search' />
        <Styled.SearchButton type='submit'>Search</Styled.SearchButton>
    </form>)
}

const SearchBoxMemo = memo(SearchBox)

export default SearchBoxMemo