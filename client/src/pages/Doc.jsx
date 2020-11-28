import React from 'react';
import { Introduce, MainContainer, SubContainer, TitleText } from '../components';
import styled from 'styled-components';

const DescriptionText = styled.p`
    font-size: 1.3rem;
    font-weight: 500;
    color: black;
`;

const Bar = styled.div`
    height: 1px;
    border-bottom: 1px solid black;
`;

const MarginDiv = styled.div`
    height: 3rem;
`;

const Table = styled.table`
    width: 100%;
`;

const Thead = styled.tr`
    background-color: rgb(51, 63, 80);
    color: white;
    font-weight: 700;
    height: 2rem;
`;

const Titem = styled.td`
    padding-left: 0.5rem;
    border-bottom: 1px solid black;
`;

const Tbody = styled.tr`
    height: 2rem;
`;

const APIText = styled.p`
    display:inline-block;
    background-color: rgb(249, 242, 244);
    color: rgb(204, 133, 171);
    margin: 0;
`;

const Doc = () => {
    return (
    <>
        <Introduce color="rgb(51, 63, 80)" title="Documents" description="Sound Cloud를 통해 창의적인 애플리케이션을 제작해보세요." />
        <MainContainer>
            <SubContainer>
                <TitleText> 개요 </TitleText>
                <Bar />
                <DescriptionText> 사용자의 감정을 분석해 노래 추천 후 재생가능한 API입니다. </DescriptionText>
                
                <MarginDiv />
                
                <TitleText> API URI </TitleText>
                <Bar />
                <Table>
                    <Thead>
                        <Titem> Method </Titem>
                        <Titem> Request URI </Titem>
                    </Thead>
                    <Tbody>
                        <Titem> POST </Titem>
                        <Titem> <APIText>http://musiccloud.com/api/v1/recommand</APIText> </Titem>
                    </Tbody>
                </Table>
            </SubContainer>
        </MainContainer>
    </>
    );
};

export { Doc };