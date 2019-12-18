import React, { Suspense } from "react";
import { Spin } from "antd";

const Loading = () => {
    return (
        <Spin tip="加载中...">
            <div style={{ minHeight: "100vh" }} />
        </Spin>
    );
};

export default function SplitComponent(Comp) {
    const LazyComp = React.lazy(Comp);
    return props => (
        <Suspense fallback={<Loading />}>
            <LazyComp {...props} />
        </Suspense>
    );
}
