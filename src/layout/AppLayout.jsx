import { Outlet } from "react-router-dom";
import HeadBrand from "../components/headBrand";

export default function AppLayout() {
      const cintilloHeight = 80;
    return (
        <>
        <HeadBrand />
        <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <div className="app-welcome" style={{ paddingTop: cintilloHeight }}>
                <Outlet/>
            </div>
        </div>
        </>
    )
}