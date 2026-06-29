import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar cố định bên trái */}
      {showSidebar && <Sidebar />}

      {/* Vùng bên phải chứa Navbar và Nội dung */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        {/* Xóa overflow-y-auto ở đây đi */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
