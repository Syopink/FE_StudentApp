import React from "react";
import { Table, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const Test = () => {
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt" },
    { title: "Mã bàn", dataIndex: "maBan", key: "maBan" },
    { title: "Tên bàn", dataIndex: "tenBan", key: "tenBan" },
    { title: "Khối", dataIndex: "khoi", key: "khoi" },
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Button type="primary" icon={<SearchOutlined />}>Cấu hình</Button>
      ),
    },
  ];

  const data = [
    { key: "1", stt: "1", maBan: "tet", tenBan: "tet", khoi: "Khối 8" },
    { key: "2", stt: "2", maBan: "k123", tenBan: "K123", khoi: "Khối 9" },
    { key: "3", stt: "3", maBan: "test", tenBan: "test", khoi: "Khối 6" },
    { key: "4", stt: "4", maBan: "test1", tenBan: "test13", khoi: "Khối 8" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Cấu hình số tiết</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: 20 }}>
        <Input placeholder="Tên bàn" style={{ width: 200 }} />
        <Select placeholder="Chọn khối" style={{ width: 200 }}>
          <Option value="khoi6">Khối 6</Option>
          <Option value="khoi7">Khối 7</Option>
          <Option value="khoi8">Khối 8</Option>
          <Option value="khoi9">Khối 9</Option>
        </Select>
        <Button type="primary" icon={<SearchOutlined />}>Tìm kiếm</Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 30 }} />
    </div>
  );
};

export default Test;
