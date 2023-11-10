import { getUrlFlowData } from "@api/accumulApi";
import {
  Border,
  StyledTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@assets/styles/tableStyles";
import { TextBox } from "@components/common";
import { UrlFlowDtoType } from "@customtypes/dataTypes";
import { RootState } from "@reducer";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const OutDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 95%;
  height: 90%;
`;

interface TextMoveButton {
  onClick: () => void;
}

const MoveButton = styled.button<TextMoveButton>`
  width: 2.5rem;
  border-radius: 15px;
  cursor: pointer;
  border: none;
  padding: 0;
  overflow: hidden;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: ${(props) => props.theme.colors.a2};
`;

const urlDummy = [
  { id: 0, url: "로그인 페이지" },
  { id: 1, url: "레퍼러_1" },
  { id: 2, url: "https://www.youtube.com" },
  { id: 3, url: "https://www.facebook.com" },
  { id: 4, url: "https://www.twitter.com" },
  { id: 5, url: "https://www.instagram.com" },
  { id: 6, url: "https://www.linkedin.com" },
  { id: 7, url: "https://www.github.com" },
  { id: 8, url: "https://www.stackoverflow.com" },
  { id: 9, url: "https://www.reddit.com" },
];

function PageMovingStatistics() {
  // 외부 div(flex)
  // 페이지  URL 불러오기 + 직전 URL 버튼DIv
  // 상세보기 누르면 세부 정보
  const startDateTime = useSelector(
    (state: RootState) => state.dateSelectionInfo.start,
  );
  const endDateTime = useSelector(
    (state: RootState) => state.dateSelectionInfo.end,
  );

  const [selectedUrl, setSelectedUrl] = useState(""); // 이동 버튼 누를 때 선택되는
  const [data, setData] = useState<UrlFlowDtoType[]>([]);

  // URL List를 불러와 세부 데이터를 설정하는 useEffect
  useEffect(() => {
    const parseStartDateTime = new Date(startDateTime);
    const parseEndDateTime = new Date(endDateTime);

    const fetchData = async () => {
      try {
        const response = await getUrlFlowData(
          parseStartDateTime,
          parseEndDateTime,
          selectedUrl,
        );
        setData(response.urlFlowDtoList);
        if (!response.urlFlowDtoList) setData([]);
        else setData(response.urlFlowDtoList);
      } catch (error) {
        // console.error(error); // 에러 처리
      }
    };

    fetchData();
  }, [endDateTime, selectedUrl, startDateTime]);

  const pageMove = (url: string) => {
    setSelectedUrl(url);
  };

  const transformedData = data.map((item) => ({
    name: item.beforeUrl,
    y: item.count,
  }));

  // 차트 부분
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: {
      enabled: false, // 워터마크 제거
    },
    chart: {
      type: "column",
      marginTop: 30,
      borderRadius: 15,
      backgroundColor: "transparent",
      width: 600, // 차트의 너비 설정
      height: 300, // 차트의 높이 설정
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: transformedData.map((item) => item.name),
      labels: {
        style: {
          color: "white",
        },
      },
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      title: "",
      min: 0,
      tickInterval: 30, // 레이블 간격 설정
      labels: {
        style: {
          color: "white",
        },
        format: "{value}회", // 레이블 형식 지정
      },
    },
    series: [
      {
        name: "Count",
        data: transformedData,
        colors: [
          "#9b20d9",
          "#9215ac",
          "#861ec9",
          "#7a17e6",
          "#7010f9",
          "#691af3",
          "#6225ed",
          "#5b30e7",
          "#533be1",
          "#4c46db",
          "#4551d5",
          "#3e5ccf",
          "#3667c9",
          "#2f72c3",
          "#277dbd",
          "#1f88b7",
          "#1693b1",
          "#0a9eaa",
          "#03c69b",
          "#00f194",
        ],
        colorByPoint: true,
        groupPadding: 0,
      },
    ],
  };

  return (
    <OutDiv>
      <TextBox width="30%" height="100%">
        <Border>
          <StyledTable>
            <TableHeader>
              <tr>
                <th>URL</th>
                <th>이동</th>
              </tr>
            </TableHeader>
            <TableBody>
              {urlDummy.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.url}</TableCell>
                  <TableCell>
                    <MoveButton onClick={() => pageMove(item.url)}>
                      이동
                    </MoveButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Border>
      </TextBox>
      <TextBox width="65%" height="100%">
        {data.length > 0 ? (
          <HighchartsReact highcharts={Highcharts} options={options} />
        ) : (
          <div>데이터가 없습니다</div>
        )}
      </TextBox>
    </OutDiv>
  );
}

export default PageMovingStatistics;
