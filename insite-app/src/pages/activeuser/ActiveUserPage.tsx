import RealTimeUserDonutChart from "@components/chart/RealTimeUserDonutChart";
import styled from "styled-components";
import { DefaultBox } from "@components/common";
import TextBox from "@components/common/TextBox";
import TitleBox from "@components/common/TitleBox";
import {
  ButtonStatistics,
  PageUsageStatistics,
  UrlFlowStatstics,
} from "@components/realtime";

const FirstCol = styled.div`
  display: flex;
  width: 100%;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.b2};
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  align-items: center;

  width: 100%;
  height: 90%;
`;

const SecondCol = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.b2};
`;

const ThirdCol = styled.div`
  display: flex;
  width: 100%;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.b2};
`;

const ContentHeader = styled.div`
  font-size: 1.5rem;
`;

function ActiveUserPage() {
  return (
    <>
      <FirstCol>
        <DefaultBox width="30rem" height="25rem">
          <TitleBox width="" height="10%" fontSize="30px">
            <ContentHeader>활동 사용자 수 조회</ContentHeader>
          </TitleBox>
          <ContentDiv>
            <RealTimeUserDonutChart />
          </ContentDiv>
        </DefaultBox>
        <DefaultBox width="30rem" height="25rem">
          <TitleBox width="" height="10%" fontSize="30px">
            <ContentHeader>URL별 활동 사용자 평균 체류 시간</ContentHeader>
          </TitleBox>
          <TextBox width="90%" height="80%">
            <PageUsageStatistics />
          </TextBox>
        </DefaultBox>
        <DefaultBox width="30rem" height="25rem">
          <TitleBox width="" height="10%" fontSize="30px">
            <ContentHeader>URL별 활동 사용자 수 / 사용자 수</ContentHeader>
          </TitleBox>
          <TextBox width="90%" height="80%">
            <PageUsageStatistics />
          </TextBox>
        </DefaultBox>
      </FirstCol>
      <SecondCol>
        <DefaultBox width="24rem" height="25rem">
          <TitleBox width="" height="10%" fontSize="30px">
            OS별 활동 사용자 수
          </TitleBox>
          <TextBox width="90%" height="80%">
            <UrlFlowStatstics />
          </TextBox>
        </DefaultBox>
        <DefaultBox width="24rem" height="25rem">
          <TitleBox width="" height="10%" fontSize="30px">
            <ContentHeader>페이지 조회/ 활동 사용자 수</ContentHeader>
          </TitleBox>
          <TextBox width="90%" height="80%">
            <ButtonStatistics />
          </TextBox>
        </DefaultBox>
      </SecondCol>
      <ThirdCol>t</ThirdCol>
    </>
  );
}

export default ActiveUserPage;
