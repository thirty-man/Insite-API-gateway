import {
  Border,
  StyledTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@assets/styles/tableStyles";
import { TextBox } from "@components/common";
import styled from "styled-components";

const OutDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 95%;
  height: 90%;
`;

function ButtonClickLogs() {
  const tempdata = [
    {
      id: 1,
      Url: "주소",
      clickTime: "12:12",
      cookieId: "123123",
      abnormal: "true",
    },
  ];

  return (
    <OutDiv>
      <TextBox width="70%" height="90%">
        <Border>
          <StyledTable>
            <TableHeader>
              <tr>
                <th>순위</th>
                <th>URL</th>
                <th>클릭 시간</th>
                <th>쿠키 아이디</th>
                <th>비정상 접근</th>
              </tr>
            </TableHeader>
            <TableBody>
              {tempdata.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.Url}</TableCell>
                  <TableCell>{item.clickTime}</TableCell>
                  <TableCell>{item.cookieId}</TableCell>
                  <TableCell>{item.abnormal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Border>
      </TextBox>
      <div>안녕</div>
    </OutDiv>
  );
}

export default ButtonClickLogs;
