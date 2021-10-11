import React, { useCallback, useState } from "react";
import { TopBar } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

export default function Index() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleIsUserMenuOpen = useCallback((e) => {
    setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
  }, []);

  const handleSingOut = () => {
    signOut(getAuth());
  };
  const user = useSelector((state) => state.user);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: "Sign Out",
              icon: ArrowLeftMinor,
              onAction: handleSingOut,
            },
          ],
        },
      ]}
      name={user.userInfo && user.userInfo.displayName}
      detail={user.userInfo && user.userInfo.email}
      avatar={user.userInfo && user.userInfo.photoURL}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  return (
    <div style={{ height: "60px" }}>
      <TopBar userMenu={userMenuMarkup} />
    </div>
  );
}
