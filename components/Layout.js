import Head from "next/head"
import Header from './Header'
import Search from "./Search"
const Layout = ({ children, title, keywords, description }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
                <link rel="icon" href="./favicon.ico" />
            </Head>
            <Header />

            <main className="container mx-auto my-7">{children}</main>
        </div>
    )
}

Layout.defaultProps = {
    title: 'Welcome To Dev Space',
    keywords: 'Code Dev Programming',
    description: 'Best Info Here'
}
export default Layout

