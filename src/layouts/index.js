import Header from "src/components/header";

const UserLayout = (props) => {
    const { children } = props;
    return (
        <>
            <Header />
            {children}
        </>
    )
}
export default UserLayout;