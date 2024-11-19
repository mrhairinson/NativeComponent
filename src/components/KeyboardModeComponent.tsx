import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useAppTheme} from '~/resources/theme';
import ButtonComponent from './ButtonComponent';
import IconChangeToSmall from '~/resources/icons/caculator/IconChangeToSmall';
import IconDelete from '~/resources/icons/caculator/IconDelete';
import IconChangeToBig from '~/resources/icons/caculator/IconChangeToBig';
import IconCalDoubleArrow from '~/resources/icons/caculator/IconCalDoubleArrow';
import IconCalThong from '~/resources/icons/caculator/IconCalThong';
import IconCalSquareRoot from '~/resources/icons/caculator/IconCalSquareRoot';
import IconCalPi from '~/resources/icons/caculator/IconCalPi';

export const enum e_KeyboardMode {
  SMALL_BUTTON,
  BIG_BUTTON,
}

const TEXT_BIG_BUTTON = 30;
const TEXT_SMALL_BUTTON = 20;

type ComponentParam = {
  k_width: number;
  k_ratio: number;
};

const KeyboardModeComponent = ({k_width, k_ratio}: ComponentParam) => {
  const theme = useAppTheme();
  const [keyboardMode, setKeyboardMode] = useState<e_KeyboardMode>(
    e_KeyboardMode.SMALL_BUTTON,
  );

  const handleChangeBigMode = () => {
    setKeyboardMode(e_KeyboardMode.BIG_BUTTON);
  };

  const handleChangeSmallMode = () => {
    setKeyboardMode(e_KeyboardMode.SMALL_BUTTON);
  };

  return (
    <View style={{width: k_width, aspectRatio: k_ratio}}>
      {keyboardMode === e_KeyboardMode.BIG_BUTTON ? (
        <View style={{flex: 1, gap: 5}}>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="AC"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title={<IconChangeToSmall />}
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_BIG_BUTTON}
                onPress={handleChangeSmallMode}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="%"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="÷"
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="7"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="8"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="9"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="×"
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="4"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="5"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="6"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="–"
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="1"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="2"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="3"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="+"
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="."
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="0"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title={<IconDelete />}
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="="
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_BIG_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      ) : (
        // Small keyboad button
        <View style={{flex: 1, gap: 5}}>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title={<IconChangeToBig />}
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={handleChangeBigMode}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title={<IconCalDoubleArrow />}
                bgColor={theme.colors.btnCalSpec}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="log"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="ln"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title={<IconCalThong />}
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="sin"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="cos"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="tan"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="deg"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="AC"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title={<IconCalSquareRoot />}
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="("
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title=")"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="%"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="÷"
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="^"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="7"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="8"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="9"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="×"
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="|"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="4"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="5"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="6"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="-"
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title={<IconCalPi />}
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="1"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="2"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="3"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="+"
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={[styles.calRow]}>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="e"
                bgColor={theme.colors.btnCalFunc}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="."
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="0"
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title={<IconDelete/>}
                bgColor={theme.colors.btnCalNum}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
            <View style={[styles.calRowBtn]}>
              <ButtonComponent
                title="="
                bgColor={theme.colors.btnCalOperator}
                textColor={theme.colors.text_white}
                textSize={TEXT_SMALL_BUTTON}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default KeyboardModeComponent;

const styles = StyleSheet.create({
  calRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  calRowBtn: {
    flex: 1,
  },
});
