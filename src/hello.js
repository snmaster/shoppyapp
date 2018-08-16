import React, { Component } from "react";
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { Text, TextInput, Image, FlatList, View, StyleSheet } from "react-native";

class hello extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  render() {
    const {ProductGroup} = this.props;
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection:"column", backgroundColor: "powderblue" }}>
          <TextInput
            style={styles.name}
            placeholder="type your name"
            onChangeText={value => {
              this.setState({ name: value });
            }}
          />
          <View style={{flex:4}}>
          <Image
              style={{flex: 1}}
              source={{
                uri: `https://mtshop.imgix.net/shopkeeper/product/0001686_pv-118-subwoofer.png`,
              }}
            />
          </View>
          <FlatList
            data={ProductGroup}            
            renderItem={({item}) => <Text key={item.id}>{item.Name}</Text>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center"
  },
  text: {
    textAlign: "left",
    fontSize: 14
  }
});

const QUERY  = gql`
query productGroupQuery{
  ProductGroup(returnEmpty:true){
    id
    Alias
    Name
    Thumb
  }
}
`;

const productGroupQuery = graphql(QUERY, {
  options({parentGroupId}){
    return {
        variables:{
            parentGroupId:22
        }
    };
  },
  props:({data:{loading,ProductGroup}})=>{
    return {
      loading,
      ProductGroup
    };
  }
});

export default compose(
  productGroupQuery
)(hello);

//export default (<TheComponent parentGroupId={22} />)