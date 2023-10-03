import Card from "./Card";
import PostWidget from "./Postwidget";
import PostWidgetModal from "./Postwidgetmodal";

const UserLayout = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <PostWidgetModal />
        <Card />
      </div>
    </>
  );
};
export default UserLayout;
