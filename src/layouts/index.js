import Header from "src/components/header";

const UserLayout = (props) => {
    const { children } = props;
    return (
        <>
            <Header />
            {children}
            {/*children에 뭐가 들어가든 다 들어감<div>든 뭐든*/}
        </>
    )
}
export default UserLayout;